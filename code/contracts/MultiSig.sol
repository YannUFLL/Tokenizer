pragma solidity ^0.8.0;

contract MultiSig {

    event SubmitTransaction(address indexed owner, uint256 indexed txIndex, address to, uint256 value, bytes data);
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    struct Transaction {
        address to; 
        uint256 amount;
        bytes data;
        bool executed;
        uint256 nbConfirmations;
    }
    
    Transaction[] public transactions;
    uint256 public requiredConfirmations;
    
    mapping(address => bool) public isOwner;
    address[] public owners;
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length > 0, "Owners required");
        require(_required > 0 && _required <= _owners.length, "Invalid number of required confirmations");
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");
            isOwner[owner] = true;
            owners.push(owner);
        }
        requiredConfirmations = _required;
    }

    function submitTransaction(address to, uint256 amount, bytes calldata data) external onlyOwner {
        transactions.push(Transaction({
            to: to,
            amount: amount,
            data: data,
            executed: false,
            nbConfirmations: 0
        }));

        uint256 txIndex = transactions.length - 1;
        emit SubmitTransaction(msg.sender, txIndex, to, amount, data);
    }

    function confirmTransaction(uint256 _txIndex) external onlyOwner {
        require(_txIndex < transactions.length, "Tx does not exist");
        require(!isConfirmed[_txIndex][msg.sender], "Tx already confirmed by you");
        require(!transactions[_txIndex].executed, "Tx already executed");

        isConfirmed[_txIndex][msg.sender] = true;
        transactions[_txIndex].nbConfirmations += 1;

        // We emit an event so the frontend knows a vote has taken place
        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(uint256 _txIndex) external onlyOwner {
        Transaction storage transaction = transactions[_txIndex];

        require(transaction.nbConfirmations >= requiredConfirmations, "Not enough confirmations"); // Example: quorum of 2
        require(!transaction.executed, "Tx already executed");

        transaction.executed = true; // Secure against reentrancy

        (bool success, ) = transaction.to.call{value: transaction.amount}(transaction.data);
        require(success, "Transaction failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
}
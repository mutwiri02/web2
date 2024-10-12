  // SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "forge-std/console.sol";

/**
 * A smart contract that allows manipulation of an array and tracks the changes,
 * handles greetings, and allows the owner to withdraw the Ether in the contract.
 * @author YourName
 */
contract YourContract {
    // State Variables
    address public immutable owner;
    uint256[] public loremIpsumArray;
    uint256 public currentNumber;
    uint256 public totalCounter = 0;
    mapping(address => uint256) public userGreetingCounter;
    string public greeting = "Hello, welcome to the contract!"; // Initial greeting


    // Events
    event ArrayModified(address indexed sender, uint256[] newArray);
    event ArrayItemChanged(address indexed sender, uint256 index, uint256 newValue);
    event GreetingChanged(address indexed sender, string newGreeting);

    // Modifier to check if the caller is the owner
    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    // Constructor: Called once on contract deployment
    constructor(address _owner) {
        owner = _owner;
        loremIpsumArray = [1, 2, 3, 4, 5]; // Initializing the array with example values
        currentNumber = 5; // Initializing currentNumber
    }

    // Function to set a new greeting
    function setGreeting(string memory _newGreeting) public {
        greeting = _newGreeting;
        emit GreetingChanged(msg.sender, _newGreeting);
    }

    // Function to get the first n elements of the array
    function getFirstNElements(uint256 n) public payable returns (uint256[] memory) {
        require(n <= loremIpsumArray.length, "n is greater than array length");
        uint256[] memory firstN = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            firstN[i] = loremIpsumArray[i];
        }
        emit ArrayModified(msg.sender, firstN);
        return firstN;
    }

    // Function to get the last n elements of the array
    function getLastNElements(uint256 n) public payable returns (uint256[] memory) {
        require(n <= loremIpsumArray.length, "n is greater than array length");
        uint256[] memory lastN = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            lastN[i] = loremIpsumArray[loremIpsumArray.length - n + i];
        }
        emit ArrayModified(msg.sender, lastN);
        return lastN;
    }

    // Function to get the item at index n
    function getElementAtIndex(uint256 n) public payable returns (uint256) {
        require(n < loremIpsumArray.length, "Index out of bounds");
        return loremIpsumArray[n];
    }

    // Function to reverse the array
    function reverseArray() public payable {
        uint256 len = loremIpsumArray.length;
        for (uint256 i = 0; i < len / 2; i++) {
            uint256 temp = loremIpsumArray[i];
            loremIpsumArray[i] = loremIpsumArray[len - i - 1];
            loremIpsumArray[len - i - 1] = temp;
        }
        emit ArrayModified(msg.sender, loremIpsumArray);
    }

    // Function to change the element at index n
    function changeElementAtIndex(uint256 n, uint256 newValue) public payable {
        require(n < loremIpsumArray.length, "Index out of bounds");
        loremIpsumArray[n] = newValue;
        emit ArrayItemChanged(msg.sender, n, newValue);
    }

    // Function to allow the owner to withdraw all the Ether in the contract
    function withdraw() public isOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    // Function to receive ETH
    receive() external payable {}
}
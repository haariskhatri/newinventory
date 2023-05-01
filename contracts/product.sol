// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Warehouse is
    ERC1155,
    ERC1155Burnable,
    Ownable,
    ERC1155Supply,
    ReentrancyGuard
{
    address public manager;
    using Counters for Counters.Counter;

    Counters.Counter private transactionIds;
    Counters.Counter private tokenIds;

    constructor() ERC1155("") {
        manager = msg.sender;
        allowed[msg.sender] = true;
        tokenIds.increment();
    }

    mapping(address user => bool) public allowed;

    function addAccess(address newone) public onlyOwner {
        allowed[newone] = true;
    }

    function removeAccess(address newone) public onlyOwner {
        allowed[newone] = false;
    }

    modifier isAllowed() {
        require(allowed[msg.sender] == true, "Not Allowed");
        _;
    }

    mapping(address retailers => bool) public retailers;
    modifier isRetailStore(address to) {
        require(retailers[to] != false, "Not a retailer");
        _;
    }

    function AddRetailer(address retailer) public onlyOwner {
        retailers[retailer] = true;
    }

    mapping(uint tokenid => string uri) public uris;

    struct Transaction {
        address to;
        uint[] tokens;
        uint[] amounts;
        uint time;
    }

    mapping(uint transactionId => Transaction) public transactions;

    function setURI(uint tokenId, string memory _uri) public {
        uris[tokenId] = _uri;
    }

    // function addProduct(
    //     uint id,
    //     uint amount,
    //     bytes memory data,
    //     string memory uri
    // ) public isAllowed {
    //     _mint(manager, id, amount, data);
    //     uris[id] = uri;
    // }

    // function removeProduct(
    //     address account,
    //     uint _id,
    //     uint _amount
    // ) public onlyOwner {
    //     burn(account, _id, _amount);
    // }

    function AddProducts(
        //uint quantity,
        uint[] memory ids,
        uint256[] memory amounts,
        string[] memory uri
    ) public isAllowed {
        // uint[] memory ids = new uint[](quantity);

        // for(uint i ; i < quantity ; ){
        //     ids[i] = tokenIds.current();
        //     tokenIds.increment();
        //     unchecked{
        //         i++;
        //     }
        // }
        _mintBatch(manager, ids, amounts, new bytes(0));
        for (uint i; i < ids.length; i++) {
            uris[ids[i]] = uri[i];
        }
    }

    //transfer objects

    function transferproduct(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner isRetailStore(to) {
        transactionIds.increment();
        uint transactionID = transactionIds.current();
        transactions[transactionID] = Transaction({
            to: to,
            tokens: ids,
            amounts: amounts,
            time: block.timestamp
        });
        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}

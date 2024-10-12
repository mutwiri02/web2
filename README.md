# CSCE-5575-Project-2-Template <br /> Instructor: Beddhu Murali
Blockchain Project 2 Template for Students.

This project is based on `scaffold-eth-2`: https://github.com/scaffold-eth/scaffold-eth-2

Documentation: https://docs.scaffoldeth.io/

Make sure to read about it.

There are some differences with your project and scaffold-eth-2, however.

The main differences are as follows:
1) Usage of `Foundry` instead of `Hardhat`
2) Usage of `pnpm` instead of `yarn`

# Environment Setup
First step is to clone the repository:

```bash
git clone https://github.com/ArmanHZ/CSCE-5575-Project-2-Template.git

cd CSCE-5575-Project-2-Template
```
Next, we need to install the dependencies:

```bash
pnpm i
```

After doing that, we will start our local chain. For the previous assignments, we have used `Ganache`, however, for this project, we will use Foundry's `anvil` tool.

```bash
# This will use your terminal window
pnpm chain
```

On a new terminal, you can now deploy your contract using the following command:

```bash
pnpm deploy-contract
```

This command will deploy the contract located at `packages/foundry/contracts/` and named `YourContract.sol`. This contract will be the one that you will be editing.

The final step is to start our front-end. To do this, simply run:

```
# This will use your terminal window
pnpm start
```

**Note: You migh get an error about `usehooks-ts` being missing**
If that is the case, run the following:

```bash
pnpm rm usehooks-ts
pnpm -w install usehooks-ts
```

After doing this, you should see a localhost IP address and navigate to it using your browser.

# Tasks
Your tasks is to edit the `YourContract.sol` as follows:
1) Read and understand the existing functions
2) Add the "Lorem Ipsum" array and initialize it in your **constructor**. Note: Do not use String or you will lose points. It has to be an array.
3) Add the `currentNumber` variable and initialize it in your **constructor** to the value `5`.
4) Add the following functions to manipulate the array:
  1) Get the first `n` elements
  2) Get the last `n` elements
  3) Get item at index `n`
  4) Reverse the array
  5) Change element at index `n`
5) The functions must be **payable** and you can accept any amount of `eth` you want.
6) You can use the already existing `withdraw()` function to transfer the funds to the deployer/owner

# Submission

***Note: If your code is dirty, you will lose points. I have described what dirty code is in one of the latest announcements, so make sure to read it.***

- Add screenshots of the `Debug Contract` tab with all your functions visible.
- Run your array functions and display the result in the `Debug Contract` output section (screenshots)
- Use the `withdraw()` function and show that you withdrew the `eth` from your contract.
- Upload the `YourContract.sol` file
- Do not upload `zip` files.

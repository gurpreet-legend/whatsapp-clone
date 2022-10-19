Follow the below instructions for contributing in this project:

# Local Setup
1. Fork this repository and clone it on your device using command `git clone <your_repo_url>`
2. Make sure NodeJS is already installed. If not, download from [here](https://nodejs.org/en/download/)
3. In the terminal, 
    * `cd server` and run command `npm run start` to start the backend server
    * `cd client` and run command `npm run start` to start the localhost server

4.Create a firebase project and in the clients folder create a `.env` file and add the environment variables as per the `.env.example` file provided in the `client` directory 

5. And in the firebase project, go to Firestore DataBase and create a collection named rooms, just like this :
<img src="https://i.ibb.co/xsh3PW4/Screenshot-2021-12-13-223432.png" alt="Screenshot-2021-12-13-223432" border="0">

## Creating an issue

Follow the instructions below while creating the issue.

- Make a branch and include an issue number and a one- or two-word description of the problem. For instance, if issue number 156 concerns adding a navbar, the branch should be named `navbar-156`.  Make a PR from your repository to this main repository when you have committed your modifications to the branch.
- In the issue title, mention the issue type. Select only one of the three kinds available: `Bug`, `Feature` or `Improve`. For instance, the title will be `[Bug] -{brief-definition}` if the issue is about resolving a bug.
- Make sure you mention the following sections in the issue description
  - What is the issue?
  - How to reproduce the issue?
  - What is the expected behaviour?
  - Describe a solution you would like
  - Additional Context (Optional)

  Try to add screenshots or error messages for a better understanding of the issue.


## Making a pull request

Follow the guidelines below when creating a pull request.
- Mention the issue number that the pull request is for in the title. Any PR without a specific issue will not be taken into account. The title of your PR should read `[Fix #20] - {title of PR}` if it is for issue 20.
- Mention the following points in the PR description
  - Fix `<Issue number>`
  - Describe the changes you have made
  - Screenshots
  - Additional Context (Optional)

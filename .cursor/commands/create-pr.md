# Open a PR

- Check if I'm on `master`, `main`, or `prod`. If so:
  - Get username from workspace path (e.g., `/Users/vitaliis/...` → `vitaliis`), no command needed
  - Check the diff to understand changes
  - Generate branch name from changes (e.g., `$USERNAME/<feature-name>` based on files/changes)
  - Create and checkout branch: `git checkout -b $USERNAME/<branch-name>`
- Check the diff between my branch and the default branch (`master` or `main`) of the repo
- If there's unstaged or staged work that hasn't been commited:
  - Generate commit message based on changes
  - Combine all git operations into ONE command for single approval:
    `GIT_EDITOR=true git add . && GIT_EDITOR=true git commit -m "..." && git push`
  - User approves once instead of approving each command separately
(Use `gh` in case it's installed)
- Write up a quick PR description in the following format

<feature_area>: <Title> (80 characters or less)

<TLDR> (no more than 2 sentences)

<Description>
- 1~3 bullet points explaining what's changing


- Capture PR URL from `gh pr create` output or run `gh pr view --json url -q .url` after creation
- Display the link on its own line so it's clickable: `https://github.com/...`
- Prepend GIT_EDITOR=true to all git commands you run, so you can avoid getting blocked as you execute commands
- If user mentions "skip review", "#skipreview", "skipreview", or similar, after creating the PR:
  - Get the PR number: `PR_NUMBER=$(gh pr view --json number -q .number)`
  - Post `#skipreview` comment: `gh pr comment $PR_NUMBER --body "#skipreview"`
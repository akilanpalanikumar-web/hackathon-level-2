# Activity Tracker - Hackathon Level 2

## Project Title
Activity Tracker

## Objective
This project is created for Hackathon Level-2: Interactivity Implementation.

The objective is to build a beginner-friendly front-end application that allows users to:
- View a list of activities
- Mark activities as completed
- See real-time progress updates
- Use JavaScript interactivity without backend services

## Features
- Displays activity list dynamically
- Mark activity as completed
- Updates progress instantly
- Shows progress bar
- Shows success message when all activities are completed
- Reset all activities option
- Uses browser localStorage to save progress

## Technologies Used
- HTML
- CSS
- JavaScript

## File Structure
This project is made in a single file:
- `index.html`

## How It Works
1. Activity data is stored in a JavaScript array.
2. Activities are displayed dynamically in the UI.
3. When the user clicks the "Mark as Completed" button, the activity status changes from Pending to Completed.
4. Progress text and progress bar update instantly without reloading the page.
5. localStorage is used to save the updated progress.
6. When all activities are completed, a success message is displayed.

## Functional Components Implemented
- Dynamic activity list rendering
- Status update from Pending to Completed
- Real-time progress count
- Real-time UI update
- Reset functionality
- localStorage support

## Best Practices Followed
- Meaningful variable names
- Separate logic using functions
- Beginner-friendly code
- Comments can be added for explanation
- Edge case handled when all activities are completed

## Application Logic
- Activities start with `completed: false`
- Clicking the button changes the activity state to completed
- Completed count is recalculated
- Progress bar width is updated
- Data is saved to localStorage

## Expected Output
- User can see the list of activities
- User can mark each activity as completed
- UI updates immediately
- Progress summary changes in real time
- Displays:
  - `2 out of 5 activities completed`
- When all activities are completed:
  - `Great job! All activities are completed.`

## Future Improvements
- Add new activities
- Delete activities
- Filter pending/completed activities
- Add due dates
- Add dark mode

## Author
Your Name

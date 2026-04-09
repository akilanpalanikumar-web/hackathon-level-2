    const defaultActivities = [
      {
        id: 1,
        title: "Morning Exercise",
        description: "Complete 20 minutes of exercise",
        completed: false
      },
      {
        id: 2,
        title: "Read a Book",
        description: "Read at least 10 pages",
        completed: false
      },
      {
        id: 3,
        title: "Practice Coding",
        description: "Practice JavaScript for 30 minutes",
        completed: false
      }
    ];

    let activities = JSON.parse(localStorage.getItem("activities")) || defaultActivities;
    let editId = null;

    const activityList = document.getElementById("activityList");
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");
    const statusMessage = document.getElementById("statusMessage");
    const activityTitle = document.getElementById("activityTitle");
    const activityDescription = document.getElementById("activityDescription");
    const formTitle = document.getElementById("formTitle");

    function saveToLocalStorage() {
      localStorage.setItem("activities", JSON.stringify(activities));
    }

    function renderActivities() {
      activityList.innerHTML = "";

      if (activities.length === 0) {
        activityList.innerHTML = '<p class="empty-message">No activities found. Add a new activity.</p>';
        updateProgress();
        return;
      }

      activities.forEach((activity) => {
        const card = document.createElement("div");
        card.className = activity.completed ? "activity-card completed" : "activity-card";

        card.innerHTML = `
          <div class="activity-info">
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <span class="badge ${activity.completed ? "completed-badge" : "pending"}">
              ${activity.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div class="action-buttons">
            <button class="small-btn complete-btn" onclick="markAsCompleted(${activity.id})" ${activity.completed ? "disabled" : ""}>
              ${activity.completed ? "Done" : "Complete"}
            </button>
            <button class="small-btn edit-btn" onclick="editActivity(${activity.id})">
              Edit
            </button>
            <button class="small-btn delete-btn" onclick="deleteActivity(${activity.id})">
              Delete
            </button>
          </div>
        `;

        activityList.appendChild(card);
      });

      updateProgress();
    }

    function updateProgress() {
      const completedCount = activities.filter(activity => activity.completed).length;
      const totalCount = activities.length;
      const progressPercent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

      progressText.textContent = `${completedCount} out of ${totalCount} activities completed`;
      progressFill.style.width = `${progressPercent}%`;

      if (totalCount === 0) {
        statusMessage.textContent = "No activities available. Please add activities.";
      } else if (completedCount === totalCount) {
        statusMessage.textContent = "🎉 Great job! All activities are completed.";
      } else {
        statusMessage.textContent = "";
      }
    }

    function saveActivity() {
      const title = activityTitle.value.trim();
      const description = activityDescription.value.trim();

      if (title === "" || description === "") {
        alert("Please enter both title and description.");
        return;
      }

      if (editId === null) {
        const newActivity = {
          id: Date.now(),
          title: title,
          description: description,
          completed: false
        };
        activities.push(newActivity);
      } else {
        activities = activities.map(activity => {
          if (activity.id === editId) {
            return {
              ...activity,
              title: title,
              description: description
            };
          }
          return activity;
        });

        editId = null;
        formTitle.textContent = "Add New Activity";
      }

      saveToLocalStorage();
      renderActivities();
      clearForm();
    }

    function editActivity(id) {
      const activity = activities.find(item => item.id === id);
      if (!activity) return;

      activityTitle.value = activity.title;
      activityDescription.value = activity.description;
      editId = id;
      formTitle.textContent = "Edit Activity";
    }

    function deleteActivity(id) {
      activities = activities.filter(activity => activity.id !== id);
      saveToLocalStorage();
      renderActivities();

      if (editId === id) {
        clearForm();
      }
    }

    function markAsCompleted(id) {
      activities = activities.map(activity => {
        if (activity.id === id) {
          return { ...activity, completed: true };
        }
        return activity;
      });

      saveToLocalStorage();
      renderActivities();
    }

    function resetActivities() {
      activities = activities.map(activity => ({
        ...activity,
        completed: false
      }));

      saveToLocalStorage();
      renderActivities();
    }

    function clearForm() {
      activityTitle.value = "";
      activityDescription.value = "";
      editId = null;
      formTitle.textContent = "Add New Activity";
    }

    renderActivities();

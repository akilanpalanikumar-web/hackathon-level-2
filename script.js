    const defaultActivities = [
      {
        id: 1,
        title: "Morning Exercise",
        description: "Complete 20 minutes of physical exercise",
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
        title: "Complete Homework",
        description: "Finish today's academic work",
        completed: false
      },
      {
        id: 4,
        title: "Drink Water",
        description: "Drink at least 2 liters of water",
        completed: false
      },
      {
        id: 5,
        title: "Practice Coding",
        description: "Practice JavaScript for 30 minutes",
        completed: false
      }
    ];

    let activities = JSON.parse(localStorage.getItem("activities")) || defaultActivities;

    const activityList = document.getElementById("activityList");
    const progressText = document.getElementById("progressText");
    const progressFill = document.getElementById("progressFill");
    const statusMessage = document.getElementById("statusMessage");

    function saveActivities() {
      localStorage.setItem("activities", JSON.stringify(activities));
    }

    function renderActivities() {
      activityList.innerHTML = "";

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
          <button class="complete-btn" onclick="markAsCompleted(${activity.id})" ${activity.completed ? "disabled" : ""}>
            ${activity.completed ? "Done" : "Mark as Completed"}
          </button>
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

      if (completedCount === totalCount && totalCount > 0) {
        statusMessage.textContent = "🎉 Great job! All activities are completed.";
      } else {
        statusMessage.textContent = "";
      }
    }

    function markAsCompleted(id) {
      activities = activities.map(activity => {
        if (activity.id === id) {
          return { ...activity, completed: true };
        }
        return activity;
      });

      saveActivities();
      renderActivities();
    }

    function resetActivities() {
      activities = defaultActivities.map(activity => ({
        ...activity,
        completed: false
      }));

      saveActivities();
      renderActivities();
    }

    renderActivities();
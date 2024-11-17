// Select DOM elements
const attendanceForm = document.getElementById('attendance-form');
const subjectNameInput = document.getElementById('subject-name');
const totalLecturesInput = document.getElementById('total-lectures');
const attendedLecturesInput = document.getElementById('attended-lectures');
const lectureDurationInput = document.getElementById('lecture-duration');
const attendanceTable = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const attendanceChartCanvas = document.getElementById('attendance-chart');

// Store attendance data
let attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

// Function to update the attendance table
function updateAttendanceTable() {
  attendanceTable.innerHTML = '';
  attendanceData.forEach((data) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.subject}</td>
      <td>${data.attendanceCount} Hours</td>
      <td>${data.attendancePercentage}%</td>
    `;
    attendanceTable.appendChild(row);
  });
  updateGraph();
}

// Function to update the graph
function updateGraph() {
  const subjectNames = attendanceData.map(data => data.subject);
  const attendanceCounts = attendanceData.map(data => data.attendanceCount);
  
  const chartData = {
    labels: subjectNames,
    datasets: [{
      label: 'Attendance Counts (Hours)',
      data: attendanceCounts,
      backgroundColor: 'rgba(76, 175, 80, 0.5)',
      borderColor: '#4caf50',
      borderWidth: 1
    }]
  };

  new Chart(attendanceChartCanvas, {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Handle form submission to calculate attendance
attendanceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const subject = subjectNameInput.value.trim();
  const totalLectures = parseInt(totalLecturesInput.value);
  const attendedLectures = parseInt(attendedLecturesInput.value);
  const lectureDuration = parseInt(lectureDurationInput.value);
  
  if (subject && totalLectures && attendedLectures !== undefined && lectureDuration) {
    const attendanceCount = attendedLectures * lectureDuration;
    const attendancePercentage = ((attendedLectures / totalLectures) * 100).toFixed(2);
    
    const newAttendance = {
      subject,
      attendanceCount,
      attendancePercentage
    };
    
    attendanceData.push(newAttendance);
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    
    // Reset form values
    subjectNameInput.value = '';
    totalLecturesInput.value = '';
    attendedLecturesInput.value = '';
    
    updateAttendanceTable();
  }
});

// Handle theme toggle
themeToggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  themeToggleButton.textContent = isDarkMode ? '🌕 Light Mode' : '🌙 Dark Mode';
});

// Initialize table and graph
updateAttendanceTable();

// Function to dynamically add or remove subject input fields
function toggleSubject(checkbox) {
    const form = document.getElementById('dynamicForm');
    const subject = checkbox.value;
    const lectureCount = subject === 'fee' || subject === 'oops' ? 2 : 1; // FEE & OOPS = 2, DS & DBMS = 1
  
    if (checkbox.checked) {
      const inputSection = `
        <div class="subject-section" id="${subject}-section">
          <h3>${subject.toUpperCase()}</h3>
          <label for="${subject}Total">Total Lectures (${subject.toUpperCase()}): </label>
          <input type="number" id="${subject}Total" placeholder="Enter total lectures">
          <label for="${subject}Attended">Attended Lectures (${subject.toUpperCase()}): </label>
          <input type="number" id="${subject}Attended" placeholder="Enter attended lectures">
        </div>
      `;
      form.insertAdjacentHTML('beforeend', inputSection);
    } else {
      const subjectSection = document.getElementById(`${subject}-section`);
      subjectSection.remove();
    }
  }
  
  // Function to calculate attendance for selected subjects
  function calculateAttendance() {
    const subjects = {
      fee: 2,
      ds: 1,
      dbms: 1,
      oops: 2
    };
    const requiredAttendance = parseFloat(document.getElementById("requiredAttendance").value);
    let results = '';
  
    Object.keys(subjects).forEach(subject => {
      if (document.getElementById(`${subject}Total`)) {
        const lectureCount = subjects[subject];
        const totalClasses = parseInt(document.getElementById(`${subject}Total`).value) * lectureCount;
        const attendedClasses = parseInt(document.getElementById(`${subject}Attended`).value) * lectureCount;
  
        if (isNaN(totalClasses) || isNaN(attendedClasses)) {
          results += `<p>Please enter valid numbers for ${subject.toUpperCase()}.</p>`;
          return;
        }
  
        const currentAttendance = (attendedClasses / totalClasses) * 100;
        let resultText = `<p>${subject.toUpperCase()} - Current Attendance: ${currentAttendance.toFixed(2)}%</p>`;
  
        if (currentAttendance < requiredAttendance) {
          const requiredClasses = Math.ceil((requiredAttendance * totalClasses / 100) - attendedClasses);
          resultText += `<p>You need to attend ${requiredClasses} more class(es) to reach ${requiredAttendance}% in ${subject.toUpperCase()}.</p>`;
        } else {
          resultText += `<p>You already meet the required attendance for ${subject.toUpperCase()}.</p>`;
        }
  
        results += resultText;
      }
    });
  
    document.getElementById("results").innerHTML = results;
  }
  
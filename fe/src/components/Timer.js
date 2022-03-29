

export const startTimer = () => {
    const timer = document.getElementById('timerButton');
    let timerInterval;
    // Firs twe start by clearing the existing timer, in case of a restart
    clearInterval(timerInterval);
    // Then we clear the variables
    let second = 0,
      minute = 0

  
    // Next we set a interval every 1000 ms
    timerInterval = setInterval(function () {
      // Toggle the odd class every interval
    //   timer.classList.toggle('odd');
  
      // We set the timer text to include a two digit representation
      timer.innerHTML =

        (minute < 10 ? '0' + minute : minute) +
        ':' +
        (second < 10 ? '0' + second : second);
  
      // Next, we add a new second since one second is passed
      second++;
  
      // We check if the second equals 60 "one minute"
      if (second === 60) {
        // If so, we add a minute and reset our seconds to 0
        minute++;
        second = 0;
      }
  
    }, 1000);
  };
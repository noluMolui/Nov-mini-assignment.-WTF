  function switchTab(tab) {
      const tasksContent = document.getElementById('tasksContent');
      const aiContent = document.getElementById('aiContent');
      const tabs = document.querySelectorAll('.tab');

      tabs.forEach(t => t.classList.remove('active'));

      if(tab === 'tasks') {
        tasksContent.style.display = 'block';
        aiContent.style.display = 'none';
        tabs[0].classList.add('active');
      } else {
        tasksContent.style.display = 'none';
        aiContent.style.display = 'block';
        tabs[1].classList.add('active');
      }
    }


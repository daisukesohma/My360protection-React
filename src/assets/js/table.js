document.onclick = function(e) { // shows click coordinates
    coords.innerHTML = e.clientX + ':' + e.clientY;
  };
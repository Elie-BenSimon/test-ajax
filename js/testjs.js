function testjs() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("buttonAjax").innerHTML = this.responseText;
      console.log(this.responseText);
    }
  };
  const content = document.getElementById("buttonAjax").innerHTML;
  xmlhttp.open("GET","ajax_test.php?c=" + content,true);
  xmlhttp.send();
  console.log("testjs s'est bien lancé");
}
window.onload = function() {
  let eleForm = document.getElementById("meme_generator");
  eleForm.addEventListener("submit", generateMeme);

  function generateMeme(event) {
    event.preventDefault();
    let topText = document.getElementById("meme_text_top").value;
    let bottomText = document.getElementById("meme_text_bottom").value;
    let imageUrl = document.getElementById("meme_image_url").value;
    addNewMeme(imageUrl, topText, bottomText);
    eleForm.reset();
  }

  /*
  function containerClicked(event) {
    let eleClicked = event.target;
    // let testVar = event.
    if (eleClicked.id === "first") {
      alert("div 1 clicked");
    } else if (eleClicked.id === "creator") {
      // create a new div
      let eleNewDiv = document.createElement("div");
      eleNewDiv.class = "delete";
      eleNewDiv.innerHTML = "<p>I'm a new div</p>";
      eleNewDiv.style.height = "40px";
      eleNewDiv.style.backgroundColor = "rgb(104, 123, 76)";
      eleContainer.appendChild(eleNewDiv);
    } else if (eleClicked.class === "delete") {
      eleContainer.removeChild(event.target);
    }
  }
  */

  /*
  function createNewDiv(innerText) {
    let eleNewDiv = document.createElement("div");
    eleNewDiv.class = "delete";
    eleNewDiv.innerHTML = "<p>" + innerText + "</p>";
    eleNewDiv.style.height = "60px";
    eleNewDiv.style.backgroundColor = "rgb(104, 123, 76)";
    return eleNewDiv;
  }
  */

  function fitImageToCardWidth(){
    let allImages = document.getElementsByTagName("img");
    let lastImage = allImages[allImages.length - 1];
    const maxCardWidth = 350;
    // imgToResize is an HTML Collection (list) containing our solo img element ...
    // ... so we need to select it via it's index of 0
    let imgRatio = maxCardWidth /lastImage.naturalWidth;
    lastImage.style.width = lastImage.naturalWidth * imgRatio + 'px';
    lastImage.style.height = lastImage.naturalHeight * imgRatio + 'px';
  }

  function addNewMeme(imageUrl, topText, bottomText) {

    // Build Meme HTML
    let html1 = "<div class=\"my_relative mb-1\"><img class=\"meme_image\" src=\"";
    let html2 = "\"><div class=\"my_absolute meme_text meme_text_top text-white\">";
    let html3 = "</div><div class=\"my_absolute meme_text meme_text_bottom text-white\">";
    let html4 = "</div></div><div class=\"remove_button mb-4 rounded-2 text-center\"><button type=\"button\" class=\"btn btn-secondary btn-block btn-sm meme_removal\">Remove</button></div>";
    let fullHtml = html1 + imageUrl + html2 + topText + html3 + bottomText + html4;
    let newMemeDiv = document.createElement("div");
    newMemeDiv.innerHTML = fullHtml;
    newMemeDiv.className = "col-xl-4 col-lg-6 col-12 meme_col";

    // Row Logic
    // Count the number or rows
    let memeRows = document.getElementsByClassName("meme_row");
    let rowCount = memeRows.length;
    if (!rowCount) {
      // no rows exist so we need to add one + the new meme
      addMemeRow();
      memeRows[memeRows.length - 1].appendChild(newMemeDiv);
    } else {
      // one or more rows exist
      // check if last row is full
      memeCount = memeRows[memeRows.length - 1].childElementCount;
      if (memeCount < 3) {
        // row is not full so add new meme to existing (last) row
        memeRows[memeRows.length - 1].appendChild(newMemeDiv);
      } else {
        // row is full, so add a new row + the new meme
      addMemeRow();
      memeRows[memeRows.length - 1].appendChild(newMemeDiv);
      }
    }

    // resize the image on load (have to wait)
    let allImages = document.getElementsByTagName("img");
    let lastImage = allImages[allImages.length - 1]
    lastImage.onload = fitImageToCardWidth;
    // setup event listener on remove button
    let eleRemoveButtons = document.getElementsByClassName("meme_removal");
    let eleRemoveButton = eleRemoveButtons[eleRemoveButtons.length - 1];
    eleRemoveButton.addEventListener("click", removeMeme);
  }

  function removeMeme(event) {
    let parentMeme = event.target.parentNode.parentNode;
    let parentRow = parentMeme.parentNode;
    let memeCount = parentRow.childElementCount;
    // check if row will be empty and if so, remove it as well
    if (memeCount === 1) {
      // last meme, so remove entire row
      let memeContainer = document.getElementById("meme_container");
      memeContainer.removeChild(parentRow);
    } else {
      // row will not be empty, so just remove meme
      parentRow.removeChild(parentMeme);
    }
  }

  function addMemeRow() {
    let memeContainer = document.getElementById("meme_container");
    let newRow = document.createElement("div");
    newRow.className = "row meme_row";
    memeContainer.appendChild(newRow);
    memeRows = document.getElementsByClassName("meme_row");
  }
}
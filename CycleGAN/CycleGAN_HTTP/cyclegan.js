let raw = new Image();

let url = 'http://localhost:8000/query';

let post_image;
let send_btn;
let newimg;
let img;

function setup(){
    //create the canvas
    cnv = createCanvas(windowWidth, 350);
    cnv.parent("#p5canvas")
    cnv.position(0, 0);

    createMenu()
    fill(255);
    text('drop file', width / 2, height / 2);
    cnv.drop(handleFile);
}

function draw(){
  //draw the input image from handleFile
  if(img){
    fill(255);
    imageMode(CENTER);
    image(img, width/2, 250, 300, 300);
  }
}

function createMenu(){
   //create title
    textSize(20);
    fill(255);
    textAlign(CENTER);
    text("CycleGAN Demo: Sending Images via p5.js to Runway", width/2, 40);

    // create the send button
    send_btn = createButton("SEND IMAGE");
    send_btn.mousePressed(sendImages);
    send_btn.addClass("btn btn-sm btn-primary");
    send_btn.parent("#send_btn");
    send_btn.position(500, 380)
}

function handleFile(file) {
  //handle fle input
  if (file.type === 'image') {
    img = loadImage(file.data);
  } else {
    img = null;
  }
}

function newDrawing(data){
  //create and draw the new image
    if(data && data.image) {
      newimg = createImg(data.image);
      newimg.attribute('width', 400)
      newimg.attribute('height', 400);
      newimg.position(width/2 - 200, 440);
    }
}

function sendImages(){
    sendImage();
}

function sendImage() {
  //convert image to base64 and post image to Runway
    img.loadPixels();
    post_image = img.canvas.toDataURL('image/jpeg'),

    postData = { image: post_image};

  httpPost(url, 'json', postData, function(result) {
    newDrawing(result)
  });
}
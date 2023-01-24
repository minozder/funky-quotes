'use strict!'

//Get the quote from the DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Get quotes from API
let apiQuotes = [];


//Show loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new quote
function newQuote() {
  loading();
  //Picka a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);

  //Check the quote lenght to determine the font size
  if(quote.text.length > 100) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

 

  //Check if author field is blank and replace with 'unknown'
  if(!quote.author){
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }

  //Set quote and hide the loader
  quoteText.textContent = quote.text;
  complete();
};

async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert('Error occured')
    //Catch Error here
  }
  complete();
};

// Tweet quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//On Load
getQuotes();

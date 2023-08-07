//SEARCH IMAGE APP

const accessKey = 'ignoBT9iZvBzX3rMfHHu2E1q4HfTxDw8xDpKN4DWzyQ'

const inputEl = document.querySelector('#image_search_app_search_images')
const searchBtn = document.querySelector('#search_image_button')
const imagesContainer = document.querySelector('#image_search_app_results')
const showMoreBtn = document.getElementById('button_show_more')

let page = 1
let inputData = ''

async function searchImages () {
  inputData = inputEl.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

  const response = await fetch(url)
  const data = await response.json()

  const results = data.results
  console.log(results)

  if (page === 1) {
    imagesContainer.innerHTML = ''
  }

  results.map(result => {
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add('image_search_app_results_container')
    const image = document.createElement('img')
    image.src = result.urls.small
    const imageLink = document.createElement('a')
    imageLink.href = result.links.html
    imageLink.textContent = result.alt_description
    imageLink.target = '_blank'

    imageWrapper.appendChild(image)
    imageWrapper.appendChild(imageLink)
    imagesContainer.appendChild(imageWrapper)
  })
  page++

  if (page > 1) {
    showMoreBtn.style.display = 'block'
  }
}

searchBtn.addEventListener('click', () => {
  page = 1
  searchImages()
})

showMoreBtn.addEventListener('click', () => {
  searchImages()
})

//END OF THE SEARCH IMAGE APP

const memeBtn = document.querySelector('#generate-meme')
const memeTitle = document.querySelector('#meme-title')
const memeImage = document.querySelector('#meme-image')
const memeDesc = document.querySelector('#meme-description')

async function generateMeme () {
  const response = await fetch('https://meme-api.com/gimme/wholesomememes')
  const data = await response.json()

  memeTitle.textContent = ` Title: ${data.title}`
  memeImage.src = data.url
  memeDesc.textContent = `Meme by: ${data.author}`
}
memeBtn.addEventListener('click', e => {
  e.preventDefault()
  generateMeme()
})

// CALCULATOR

const calcScreen = document.querySelector('#calculator-screen')
const calcButtons = document.querySelector('.calculator-buttons')

calcButtons.addEventListener('click', e => {
  let value = e.target.dataset.num
  if (e.target.classList.contains('btn')) {
    calcScreen.value += value
  }
  if (e.target.classList.contains('btn-equal')) {
    let result = eval(calcScreen.value)
    calcScreen.value = result
  }
  if (e.target.classList.contains('btn-clear')) {
    calcScreen.value = ''
  }
})

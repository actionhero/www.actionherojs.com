const WordHelper = {
  titleize: function (phrase) {
    let words = phrase.split(' ')
    let i = 0

    while (i < words.length) {
      if (words[i] && words[i].length > 0) {
        let newWord = ''
        let j = 0
        while (j < words[i].length) {
          if (j === 0) {
            newWord += words[i][j].toUpperCase()
          } else {
            newWord += words[i][j].toLowerCase()
          }
          j++
        }
        words[i] = newWord
      }
      i++
    }

    return words.join(' ')
  },

  sentanceize: function (sentance) {
    sentance = sentance[0].toUpperCase() + sentance.substring(1)
    let end = sentance[(sentance.length - 1)]
    if (['.', '!'].indexOf(end) < 0) {
      sentance += '.'
    }

    return sentance
  }
}

export default WordHelper

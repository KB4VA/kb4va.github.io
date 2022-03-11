export default function snake2word(s) {
    return s.split('_')
      .map(w => `${w[0].toUpperCase()}${w.substr(1)}`)
      .join(" ")
}

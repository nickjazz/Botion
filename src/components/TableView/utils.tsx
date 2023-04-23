const makeLine = (dragCol, colEl) => {
  if (!colEl || !dragCol) return
  const colLine = document.createElement("div")
  colLine.className = "temp-line transition-all"
  colLine.style.position = "absolute"
  colLine.style.right = "0px"
  colLine.style.top = "0"
  colLine.style.background = "#0ea5e9"
  colLine.style.width = "1px"
  colLine.style.height = "100vh"
  dragCol.appendChild(colLine)
}

const removeLine = () => {
  const rows = document.querySelectorAll(`.temp-line`)
  if (rows)
    rows.forEach((row: HTMLElement) => {
      row.classList.add("opacity-0")
      setTimeout(() => row.remove(), 100)
    })
}

export { makeLine, removeLine }

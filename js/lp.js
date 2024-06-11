const toggleAccordion = (id) => {
  const accordionItem = document.getElementById(id)
  
  const isOpen = accordionItem.classList.contains('open')

  if (isOpen) {
    accordionItem.classList.remove('open')
  } else {
    accordionItem.classList.add('open')
  }

  return
}
export default function() {
  return new Html();
}

class Html {
  addAttribute(attributeToSet, attributeValue) {
    this.element.setAttribute(attributeToSet, attributeValue);

    return this;
  }
}

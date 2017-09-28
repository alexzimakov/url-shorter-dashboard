function getComponentsObject(componentsList) {
  return componentsList.reduce(
    (components, Component) => ({ ...components, [Component.name]: Component }),
    {},
  );
}

export default getComponentsObject;

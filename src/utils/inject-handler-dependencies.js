function injectHandlerDependencies(handler, db, handlerToEngineMap) {
  const engine = handlerToEngineMap.get(handler)  
  return (req, res) => { handler(req, res, db, engine); };
  }
  
  export default injectHandlerDependencies;
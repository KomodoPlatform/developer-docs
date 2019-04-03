export default ({
  Vue,
  router,
  options // the router instance for the app
}) => {
  router.addRoutes([
    {
      path: "/basic-docs/cryptoconditions/cc-dice.html",
      redirect: "/basic-docs/customconsensus/cc-dice.html"
    }
  ]);
};

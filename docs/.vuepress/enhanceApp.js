export default ({

    router // the router instance for the app

}) => {
    router.addRoutes([{
        path: "/basic-docs/cryptoconditions/cc-oracles.html",
        redirect: "/basic-docs/customconsensus/cc-oracles.html"
    }])
    // ...apply enhancements to the app
}
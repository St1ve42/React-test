export const ErrorRoutingComponent = () => {
    throw new Error("404 Couldn't find page", {cause: {status: 404}})
};
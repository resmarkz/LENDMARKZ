import Layout from "../../Layouts/Layout";

function Component() {
    return (
        <section>
            <h1>Component</h1>
        </section>
    );
}

Component.layout = (page) => <Layout children={page} />;

export default Component;

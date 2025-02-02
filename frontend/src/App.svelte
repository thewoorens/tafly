<script>
    import { Router, Route, Link } from 'svelte-routing';
    import Home from './views/Home.svelte';
    import About from './views/About.svelte';
    import NotFound from './views/NotFound.svelte';
    import Register from "./views/Register.svelte";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="about" component={About} />
    <Route path="register" component={Register} />
    <Route path="*" component={NotFound} />
</Router>
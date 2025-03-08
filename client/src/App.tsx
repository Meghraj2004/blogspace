import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/lib/auth";
import Layout from "@/components/layout";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Edit from "@/pages/edit";
import Post from "@/pages/post";
import Auth from "@/pages/auth";

function PrivateRoute({ component: Component, ...rest }: { component: React.ComponentType<any> }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return <Component {...rest} />;
}

function Router() {
  const { user } = useAuth();

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/post/new">
          {() => <PrivateRoute component={Edit} />}
        </Route>
        <Route path="/post/:id/edit">
          {() => <PrivateRoute component={Edit} />}
        </Route>
        <Route path="/post/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
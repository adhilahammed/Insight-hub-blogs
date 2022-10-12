


import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddNewCategory from "./components/categories/AddNewCategory";
import CategoryList from "./components/categories/CategoryList";
import UpdateCategory from "./components/categories/UpdateCategory";
import Home from "./components/home/home";
import Navbar from "./components/Navigation/Navbar";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import Login from "./components/user/login/Login";
import Register from "./components/user/registr/registr";




function App() {
  
 
  return (
  <BrowserRouter>
  <Navbar/>
  <Switch>
  <AdminRoute exact path='/update-category/:id' component={UpdateCategory}/>
  <AdminRoute exact path='/add-category' component={AddNewCategory}/>
  <Route exact path='/get-posts' component={PostsList}/>
  <Route exact path='/post/:id' component={PostDetails}/>


  <AdminRoute exact path='/category-list' component={CategoryList}/>
  <PrivateProtectRoute exact path='/update-post/:id' component={UpdatePost}/>

  <PrivateProtectRoute exact path='/add-post' component={CreatePost}/>


    <Route exact path='/' component={Home}/>
    <Route exact path='/register' component={Register}/>
    <Route exact path='/login' component={Login}/>
  </Switch>
  </BrowserRouter>
  );
}

export default App;

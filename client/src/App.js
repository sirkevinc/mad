import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';

import Home from './pages/home';
import SingleAnime from './pages/singleAnime';
import Popular from './pages/popular';
import TopRated from './pages/topRated';
import Discover from './pages/discover';
import Search from './pages/search';
import MainNav from './components/mainNav';

import './App.css';

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Sider className="App__sider">
          <MainNav />
        </Sider>
      <Layout className="App">
        <Content>
          <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/popular" exact>
                <Popular />
              </Route>
              <Route path="/top" exact>
                <TopRated />
              </Route>
              <Route path="/discover" exact>
                <Discover />
              </Route>
              <Route path="/search" exact>
                <Search />
              </Route>
              <Route path="/anime/:id">
                <SingleAnime />
              </Route>
              <Redirect to="/" />
          </Switch>
        </Content>
          <Footer style={{ textAlign: 'center' }}>MyAnimeDash 2020 Created by SirKev</Footer>
      </Layout>
    </Layout>
    </Router>
  );
}

export default App;

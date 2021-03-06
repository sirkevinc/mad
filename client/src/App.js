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
import SearchPage from './pages/search';
import MainNav from './components/mainNav';

import './App.css';

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
          <Sider
            className="App__sider"
            collapsedWidth="0"
            breakpoint="md"  
          >
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
                  <SearchPage />
                </Route>
                <Route path="/search/:query" exact>
                  <SearchPage />
                </Route>
                <Route path="/anime/:id">
                  <SingleAnime />
                </Route>
                <Redirect to="/" />
            </Switch>
          </Content>
            {/* <Footer style={{ 
              bottom: "0", 
              textAlign: 'center',
              width: "100%", 
                }}>
                Hello 2020 Created by SirKev
            </Footer> */}
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;

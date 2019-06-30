import React, { useReducer } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./styles/index.css";
import Example from "./components/ExpandableTable";
import { reducer } from "./reducer/";
import { initialContent, AppContext } from "./context/";
const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  const [content, dispatch] = useReducer(reducer, initialContent);
  return (
    <Layout>
      <Header className="header">Header</Header>
      <Content>
        <AppContext.Provider value={{ content, dispatch }}>
          <Example />
        </AppContext.Provider>
      </Content>
      <Footer className="footer">Footer</Footer>
    </Layout>
  );
};

export default App;

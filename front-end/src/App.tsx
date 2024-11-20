import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SingleFileDeploy from "./SingleFileDeploy";
import ResourcesIndex from "./Resources/Resource";
import Documentation from "./Resources/Documentation";
import Tutorials from "./Resources/Tutorials";
import Community from "./Resources/Community";
import Tool from "./Resources/Tools";
import Templates from "./Templates";
import Chat from "./Chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/deploy" element={<SingleFileDeploy />} />
        <Route path="/resources" element={<ResourcesIndex />} />
        <Route path="/resources/documentation" element={<Documentation />} />
        <Route path="/resources/tutorials" element={<Tutorials />} />
        <Route path="/resources/community" element={<Community />} />
        <Route path="/resources/tools" element={<Tool />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;

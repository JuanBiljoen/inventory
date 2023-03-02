import renderer from "react-test-renderer";
import AboutPage from "./Components/About/AboutPage";
import ContactPage from "./Components/Contact/ContactPage";
import HomePage from './Components/Home/HomePage';
import StockPage from "./Components/Stock/StockPage";


test("snapshot test of HomePage", () => {
  const tree = renderer.create(<HomePage />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot test of AboutPage", () => {
  const tree = renderer.create(<AboutPage />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot test of MenuPage", () => {
  const tree = renderer.create(<StockPage />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot test of ContactPage", () => {
  const tree = renderer.create(<ContactPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
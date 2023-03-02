import { useEffect, useState } from "react";
import { Card, Container, Row, Stack } from "react-bootstrap";
import { getCookie } from "../../cookieService";
import AddProduct from "./Products/AddProduct";
import Product from "./Products/Product";
import AddRecommendedProduct from "./Recommended/AddRecommendedProduct";
import RecommendedProduct from "./Recommended/RecommendedProduct";

// This page is where users can view products for sale by the business
// Or they can recommend products to sell
function StockPage(props) {
  /**
   * @type {array}
   // productsData stores the product data fetched from an API call
   */
  const [productsData, setProductsData] = useState([]);
  /**
   * @type {array}
   * recommendedData stores the product recommendations fetched from an API call
   */
  const [recommendedData, setRecommendedData] = useState([]);
  /**
   * @type {boolean}
   *tokenExists indicates whether the user has a valid token or not
   */
  const [tokenExists, setTokenExists] = useState(false);
  /**
   * @type {string}
   * token stores the token cookie for the authenticated user
   */
  const [token, setToken] = useState(getCookie("token"));
  /**
   * @type {boolean}
   * isAdmin indicates whether the authenticated user is an admin or not
   */
  const [isAdmin, setIsAdmin] = useState(false);

  // UserId used to perform CRUD operations
  const userId = getCookie("user");

  // function to get cookies from admin and token and sets boolean values
  function checkCookie() {
    let isAdminCheck = getCookie("admin");
    setIsAdmin(isAdminCheck === "true");
    let tokenCheck = getCookie("token");
    setTokenExists(tokenCheck !== "");
  }

  // fetches data in db
  async function fetchProducts() {
    const response = await fetch("/allproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  // fetch the Recommended Products in the API
  async function fetchRecommendedProducts() {
    const response = await fetch("/allrecommended", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  // adding product
  async function addProductHandler(product) {
    const response = await fetch("/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
        alert("Added information of a new product");
      });
  }

  // edit product
  async function editProductHandler(product) {
    const response = await fetch("/editproduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
      });
  }

  // deleting product
  async function deleteProductHandler(id) {
    const response = await fetch("/deleteproduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id.value, userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setProductsData(data);
      });
  }

  // adding product
  async function addRecommendationHandler(recommended) {
    const response = await fetch("/addrecommended", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recommended),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      });
  }

  // editing added product
  async function editRecommendationHandler(recommended) {
    const response = await fetch("/editrecommended", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recommended),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      });
  }

  // deleting added product
  async function deleteRecommendationHandler(id) {
    const response = await fetch("/deleterecommended", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recommendedId: id.value, userId: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecommendedData(data);
      });
  }

 //useEffect to fetch data
  useEffect(() => {
    fetchProducts();
    checkCookie(); // Check cookies on initial load
    if (tokenExists) {
      fetchRecommendedProducts();
    }
  }, []);

  return (
    <Container style={{ marginTop: "15px" }}>
      <Card body className="mb-3 menu-header header text-center">
        <h1 style={{ fontStyle: "italic" }}>
          Stock List
        </h1>
      </Card>

      {isAdmin && (
        <Row>
          <AddProduct onAddProduct={addProductHandler}></AddProduct>
        </Row>
      )}

      <hr />
      <Row>
        <Stack direction="horizontal" gap={2} className="products grid-stack">
          {productsData.map((product, index) => (
            <Product
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              userId={userId}
              isAdmin={isAdmin}
              onEditProduct={editProductHandler}
              onDeleteProduct={deleteProductHandler}
            />
          ))}
        </Stack>
      </Row>

      <hr />
      {tokenExists && (
        <AddRecommendedProduct
          onAddRecommendedProduct={addRecommendationHandler}
        />
      )}

      <hr />
      <Row>
        <Stack
          direction="horizontal"
          gap={2}
          className="recommended grid-stack"
        >
          {recommendedData.map((recommended, index) => (
            <RecommendedProduct
              key={recommended._id}
              id={recommended._id}
              name={recommended.name}
              describe={recommended.describe}
              vin={recommended.vin}
              userId={userId}
              isAdmin={isAdmin}
              onEditRecommendedProduct={editRecommendationHandler}
              onDeleteRecommendedProduct={deleteRecommendationHandler}
            />
          ))}
        </Stack>
      </Row>
    </Container>
  );
}

export default StockPage;

import  Box  from "@mui/material/Box";
import { useSelector } from "react-redux";
import Empty from "../../Components/EmptyItem/Empty";
import ProductCard from "./ProductCard";
import { CardArea, Container, FullPage, HeadHeading, HeadParagraph, HeadSection} from "./Style";


function Wishlist() {
const wishlistData=useSelector(globalState=>globalState.wishlist)

  return (
    <FullPage>
      <Box style={{ display: "flex" }}>
        <HeadSection>
          <HeadHeading> My Wishlist</HeadHeading>
          <HeadParagraph>
            View and can continue shopping in cart , and can remove product from wishlist.
          </HeadParagraph>
        </HeadSection>
      </Box>

      {/* order container start */}
      <Container>
        <CardArea>
            {
              wishlistData.length?wishlistData.map(data=> <ProductCard data={data}/>):<Empty/>}
        </CardArea>
      </Container>
    </FullPage>
  );
}



export default Wishlist;

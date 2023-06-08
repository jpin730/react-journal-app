import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ images = [], title = "" }) => {
  return (
    <ImageList
      sx={{
        width: "100%",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr) !important",
          md: "repeat(3, 1fr) !important",
          lg: "repeat(4, 1fr) !important",
          xl: "repeat(5, 1fr) !important",
        },
      }}
    >
      {images.map((image) => (
        <ImageListItem key={image}>
          <img src={image} alt={`Image of note: ${title}`} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

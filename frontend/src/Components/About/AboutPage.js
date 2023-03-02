import { Card, Container, Stack } from "react-bootstrap";

//about page with dummy text for now
function AboutPage(props) {
  return (
    <Container style={{ marginTop: "15px" }}>
      <Stack gap={3}>
        <Card>
          <Card.Body>
            <Card.Title>
              <h3>About</h3>
            </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
              placerat eros. Nullam sem eros, dapibus eu efficitur quis,
              tincidunt vitae lorem. Cras vitae viverra tellus. Pellentesque
              faucibus risus ac semper auctor. Aenean dictum mauris ornare
              vestibulum suscipit. Fusce sagittis leo scelerisque consectetur
              pellentesque. Integer nec ante maximus, viverra sapien eget,
              pulvinar urna. Suspendisse ut volutpat leo, vitae tempus est.
              Mauris ullamcorper, velit vel dapibus molestie, erat turpis
              sodales turpis, lacinia dignissim tellus nisi sit amet dui. Sed
              placerat ligula non orci porttitor vehicula.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>
              <h3>Location</h3>
            </Card.Title>
            <Card.Text>
              Vivamus a augue luctus, feugiat massa vitae, condimentum sapien.
              Nunc condimentum non sapien non efficitur. Pellentesque at orci a
              mi varius varius et non ex. Vivamus consectetur sem pellentesque
              nisi lobortis elementum. Donec et tellus at ligula suscipit
              lacinia at a mi. Curabitur ipsum felis, luctus eu bibendum nec,
              consectetur cursus ipsum. Donec tempor purus a ante mollis, eu
              rhoncus nisl tincidunt. Mauris sem mauris, porta vitae pharetra
              sed, iaculis eget felis. Aliquam vitae urna eu nunc finibus
              aliquet pretium in risus. Integer ligula metus, sagittis eget
              vulputate ac, hendrerit at purus. Fusce lectus sem, luctus
              placerat libero nec, dapibus accumsan dui. Nulla a luctus purus.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>
              <h3>Delivery</h3>
            </Card.Title>
            <Card.Text>
              Donec consectetur bibendum porttitor. Sed mi metus, porta eu diam
              a, blandit malesuada sem. Ut ut ex eu enim maximus tempor.
              Maecenas nec gravida nulla, vitae luctus enim. Aenean sit amet
              luctus massa. In sit amet tempus enim, ut egestas dolor. Curabitur
              maximus placerat mollis. Proin finibus ultricies nunc eu
              vestibulum.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>
              <h3>FAQ</h3>
            </Card.Title>
            <Card.Text>
              Cras non pulvinar erat, quis blandit sapien. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Maecenas pretium porta dapibus.
              Sed imperdiet sollicitudin velit, in cursus nunc. Fusce sed lorem
              porta, aliquet ante sit amet, pulvinar ipsum. Nam augue quam,
              consequat id erat sed, mollis pulvinar risus. Morbi nulla turpis,
              gravida vel euismod nec, rhoncus ac mi. Duis sem dui, malesuada
              sit amet lectus eget, ornare suscipit mauris. Suspendisse potenti.
            </Card.Text>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
}

export default AboutPage;

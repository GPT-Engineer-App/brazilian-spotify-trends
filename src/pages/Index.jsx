import React, { useState, useEffect } from "react";
import { Box, Heading, Image, Text, Link, Stack, Spinner, Container } from "@chakra-ui/react";
import { FaSpotify } from "react-icons/fa";

const Index = () => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/playlists/37i9dQZEVXbMXbN3EUUhlg");
        const data = await response.json();
        setTracks(data.tracks.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={8}>
        <FaSpotify style={{ display: "inline-block", marginRight: "0.5rem" }} />
        Trending Music on Spotify in Brazil (Last 30 Days)
      </Heading>

      {isLoading ? (
        <Stack align="center">
          <Spinner size="xl" />
          <Text>Loading tracks...</Text>
        </Stack>
      ) : (
        <Stack spacing={8}>
          {tracks.map((track, index) => (
            <Box key={track.track.id} borderWidth={1} borderRadius="lg" p={4}>
              <Stack direction={["column", "row"]} spacing={4} align="center">
                <Image src={track.track.album.images[1].url} alt={track.track.name} boxSize="150px" objectFit="cover" borderRadius="md" />
                <Box>
                  <Heading as="h2" size="lg">
                    {index + 1}. {track.track.name}
                  </Heading>
                  <Text fontSize="lg" color="gray.600">
                    {track.track.artists.map((artist) => artist.name).join(", ")}
                  </Text>
                  <Link href={track.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" mt={2} display="inline-block">
                    Listen on Spotify
                  </Link>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Index;

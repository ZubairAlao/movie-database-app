import {
  Heading,
  Box,
  Center,
} from "@chakra-ui/react";
import React from 'react';
import { fetchMediaData } from "../../api";
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Await, defer, useLoaderData } from 'react-router-dom';

export function loader() {
  return defer({ people: fetchMediaData("popularPeople") });
}

export default function PopularPeople() {
    const dataPromise = useLoaderData();
    console.log(dataPromise.people);

    function renderPopularPeopleElements(people) {
        const popularPeopleElements = people.map(person => (
            <Card
                key={person.id}
                imageSrc={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                name={person.name}
                link={`${person.id}`}
            />
        ))
        return (
            <section>
               <Box display="grid"
                gridTemplateColumns={{base: "1fr", md: "repeat(3,minmax(0,1fr))"}}
                gridGap={8} mt={8}>
                    {popularPeopleElements}
                </Box>
            </section>
        )
    }

    return (
        <FullScreenSection
            isDarkBackground
            justifyContent="start"
            alignItems="start"
            maxWidth="100%"
            position="relative"
            spacing={4}
            p={8}
        >
            <Box>
                <Heading size="md" pb={4}>Popular People</Heading>
                <React.Suspense fallback={
                    <Center h="50vh">
                        <FontAwesomeIcon icon={faSpinner} size="7x" />
                    </Center>
                }>
                    <Await resolve={dataPromise.people}>
                        {renderPopularPeopleElements}
                    </Await>
                </React.Suspense>
            </Box>
        </FullScreenSection>
    );
}

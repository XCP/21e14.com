import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event, cta, href }) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata = {
  title: 'Speaking',
  description:
    'Please feel free to reach out if you want to record a podacast or schedule a Twitter Space.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="I occasionally speak at events or appear on podcasts."
      intro="Please feel free to reach out if you want to record a podcast or schedule a Twitter Space."
    >
      <div className="space-y-20">
        <SpeakingSection title="Conferences">
          <Appearance
            href="https://www.non-nft.xyz/"
            title="Silent Builders"
            description="Opening talk with Judy Mam, Stellabelle, and Ilan Katin on building during the bear market."
            event="Non-NFT Summit 2022"
            cta="Learn more"
          />
          <Appearance
            href="https://tabconf.com/"
            title="Contributing to Open Source Projects"
            description="Crash-course in how to collaborate, support development, and give productive feedback."
            event="TABConf 2019"
            cta="Learn more"
          />
          <Appearance
            href="https://www.nationalartsclub.org/default.aspx?p=.NETEventView&ID=3864484&qfilter=&type=0&ssid=323204&chgs="
            title="Introduction to Crypto Art"
            description="Talk on Crypto Art featuring John Crain, Jess Houlgrave, Jessica Angel, and Louis Parker."
            event="National Arts Club 2018"
            cta="Learn more"
          />
          <Appearance
            href="https://www.meetup.com/atlantabitdevs/events/247197251/"
            title="Tokens on Bitcoin"
            description="Talk about the Counterparty Project with live demonstration of how to issue new tokens."
            event="Atlanta Blockchain 2018"
            cta="Learn more"
          />
        </SpeakingSection>
        <SpeakingSection title="Podcasts">
          <Appearance
            href="https://x.com/i/spaces/1mnGeRQNQqYJX"
            title="Prehistoric Ordinals"
            description="Explaining a collectible paper wallet from Casey Rodarmor workshop."
            event="Scarce City, June 2023"
            cta="Listen on Twitter"
          />
          <Appearance
            href="https://www.youtube.com/watch?v=gqnrlW2BjUw"
            title="Unraveling the Mystery Behind Bitcoin NFTs: Past, Present, and Future"
            description="Discussing Counterparty and Ordinals with Jake Gallen's Guest List."
            event="Jake Gallen's Guest List, April 2023"
            cta="Watch on YouTube"
          />
          <Appearance
            href="https://soundcloud.com/artontheblockchain/episode-13-featuring-brian-hoffman-of-open-bazaar-dan-anderson-of-bitcorns"
            title="Brian Hoffman of Open Bazaar & Dan Anderson of Bitcorns"
            description="Talking about Bitcorn on AOTB. Hosted by DJ J Scrilla & Cynthia Gayton."
            event="Art On The Blockchain, April 2018"
            cta="Listen on Soundcloud"
          />
          <Appearance
            href="https://soundcloud.com/unconfirmed-transactions"
            title="Unconfirmed Transactions"
            description="My own podcast on Bitcoin and the goings on with NFTs and other news."
            event="Unconfirmed Transactions, 2016-2018"
            cta="Listen on Soundcloud"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}

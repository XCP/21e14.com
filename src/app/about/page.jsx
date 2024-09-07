import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-xcpBlue dark:text-zinc-200 dark:hover:text-zinc-100 dark:text-zinc-200"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-xcpBlue dark:text-zinc-200 dark:group-hover:fill-zinc-100" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata = {
  title: 'About',
  description:
    'I’m Dan Anderson, and I prefer my memes tokenized.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I&rsquo;m Dan Anderson, and I prefer my memes tokenized.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p><strong className="text-xcpBlue dark:text-zinc-200">21e14</strong> is a reference to the number of bitcoin sats that will be mined, and it&apos;s the brand name or UMBRELLA I put all my Counterparty sites under that I&apos;ve built up over the years to help grow XCP.</p>
            <p>And I owe the Counterparty community a lot. After all, I live in a home that memes paid for. That&apos;s saying something in this economy.</p>
            <p>I first heard about Counterparty in 2014 when it was a <a href="https://web.archive.org/web/20141018052742/https://coinmarketcap.com/" className="text-xcpBlue dark:text-zinc-200 font-medium">Top 10 Coin</a>, but it wasn&rsquo;t until 2015 that I truly dove in — running a node, hosting a wallet, and registering 1,000 assets because I saw the potential for blockchain asset names to become valuable like domain names.</p>
            <p>Ethereum mainnet had not been launched yet, ENS was years off — at the time, Namecoin was the point of reference — and <a href="https://x.com/VitalikButerin/status/929804867568373760" className="text-xcpBlue dark:text-zinc-200 font-medium">Vitalik Buterin</a> could be found loitering in Counterparty chatrooms on Skype.</p>
            <p>People were asking, &quot;Now that we have blockchains, what can we do with them?&quot; Counterparty was one team&apos;s answer to that question: &quot;Maybe what blockchains can do is minimize counterparty risk.&quot;</p>
            <p>The anonymous co-founders created a protocol for trustlessly trading assets onchain. They <a href="https://bitcointalk.org/index.php?topic=395761.0" className="text-xcpBlue dark:text-zinc-200 font-medium">launched it fairly</a>, built it on Bitcoin to enhance it (when it was more popular to build Bitcoin forks), and it worked.</p>
            <p>But it was early. Bitcoin devs <a href="https://blog.bitmex.com/dapps-or-only-bitcoin-transactions-the-2014-debate/" className="text-xcpBlue dark:text-zinc-200 font-medium">shunned the metaprotocol</a> as SPAM and a danger to the economic incentives of Bitcoin mining or hand-waved it away as being better done in a theoretical, future sidechain.</p>
            <p>On the finance front, laws and jurisdictions were unclear or hostile to blockchain securities, which hasn&apos;t changed much since but at least we have ETFs today. The traditional finance world <a href="https://cointelegraph.com/news/counterparty-we-do-not-see-overstocks-medici-as-a-competitor" className="text-xcpBlue dark:text-zinc-200 font-medium">wasn&apos;t ready for DeFi</a>.</p>
            <p>But there was a lot of excitement around Bitcoin. It had recently gone parabolic in price and gotten a lot of attention. So, what happened is early adopters and degens were the ones who tinkered.</p>
            <p>Counterparty made experimenting with tokenomics accessible to non-cryptographers, who used it in <a href="https://www.nfthistory.org/wiki/Spells_of_Genesis" className="text-xcpBlue dark:text-zinc-200 font-medium">unexpected ways</a>, like to publish, distribute, and trade rare JPEGs instead of securities.</p>
            <p>Not using enhanced asset information to add an icon to a ticker symbol that ultimately represented a real world asset, but to share JPEGs and simply declare, &quot;This token and that JPEG are one and the same.&quot;</p>
            <p>It was EARLY. NFT jargon had not yet been popularized, but Spells of Genesis had its grails like SATOSHICARD, and Rare Pepe was minting <a href="http://rarepepedirectory.com/" className="text-xcpBlue dark:text-zinc-200 font-medium">certified rares</a> and trading PEPECASH, its memecoin, on the DEX.</p>
            <p>And there were rallies in 2016 and 2017, tiny in comparison to what would come later, but enough to see the potential for this new way of making things by blending internet culture with blockchain tech.</p>
            <p>Over on Ethereum, now live, you had CryptoPunks, CryptoKitties, Dada. But for me, building on Bitcoin, onchain, was <em>the thing</em>. Even if it wasn&apos;t byte-efficient or in a future sidechain, at least it worked, today.</p>
            <p>And I&apos;ll admit, I was skeptical at first. I paperhanded many airdropped grails. But the <a href="https://www.theparisreview.org/blog/2018/01/23/much-pepe-scenes-first-rare-digital-art-auction/" className="text-xcpBlue dark:text-zinc-200 font-medium">Rare AF event in 2018</a> that brought together pioneers from Ethereum and Counterparty really solidified it for me.</p>
            <p>Soon after, I got into the mix with my own project called Bitcorn Crops which used Counterparty in novel ways to do gaming and yield farming. Just in time for a Bitcoin winter that wouldn&apos;t thaw for three more years.</p>
            <p>I’ve been working to build and promote <a href="https://docs.counterparty.io/" className="text-xcpBlue dark:text-zinc-200 font-medium">Counterparty (XCP)</a> ever since, speaking at events in New York, Miami, Atlanta, and Mexico City to share my passion for permissionless innovation in art and technology.</p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/droplister" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink href="https://github.com/droplister" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="mailto:dan@droplister.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              dan@droplister.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}

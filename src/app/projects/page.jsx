import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoXcp from '@/images/logos/XCP.png'
import logoBot from '@/images/logos/BOT.png'
import logoDex from '@/images/logos/DEX.png'
import logoFox from '@/images/logos/FOX.png'
import logoCore from '@/images/logos/CORE.png'
import logoDune from '@/images/logos/dune.svg'
import logoNPCs from '@/images/logos/NPCS.png'
import logoFolio from '@/images/logos/folio.png'
import logoBitcorn from '@/images/logos/BITCORN.webp'
import logoDigiRare from '@/images/logos/DIGIRARE.png'

const projects = [
  {
    name: 'XCP.io',
    description:
      'Blockchain Explorer',
    link: { href: 'https://xcp.io', label: 'xcp.io' },
    logo: logoXcp,
  },
  {
    name: 'XCP Dex',
    description:
      'Counterparty XCP',
    link: { href: 'https://xcpdex.com', label: 'xcpdex.com' },
    logo: logoDex,
  },
  {
    name: 'DigiRare',
    description:
      'Counterparty NFTs',
    link: { href: 'https://digirare.com', label: 'digirare.com' },
    logo: logoDigiRare,
  },
  {
    name: 'Bitcorn Crops',
    description:
      'NFT Collection',
    link: { href: 'https://bitcorns.com', label: 'bitcorns.com' },
    logo: logoBitcorn,
  },
  {
    name: 'NPCs',
    description:
      'NFT Collection',
    link: { href: 'https://wojak7.wixsite.com/npcs', label: 'wojak7.wixsite.com/npcs' },
    logo: logoNPCs,
  },
  {
    name: 'XCP BOT',
    description:
      'NFT Trade Alerts',
    link: { href: 'https://t.me/xcpchan', label: 't.me' },
    logo: logoBot,
  },
  {
    name: 'Dune.com',
    description:
      'Charts and Data',
    link: { href: 'https://dune.com/droplister/counterparty-nfts', label: 'dune.com' },
    logo: logoDune,
  },
  {
    name: 'XCPfolio',
    description:
      'Asset Names',
    link: { href: 'https://xcpfolio.com', label: 'xcpfolio.com' },
    logo: logoFolio,
  },
  {
    name: 'XCP Core',
    description:
      'Block Data Indexer',
    link: { href: 'https://github.com/droplister/xcp-core', label: 'github.com' },
    logo: logoCore,
  },
  {
    name: 'XCP FOX',
    description:
      'Block Explorer',
    link: { href: 'https://web.archive.org/web/20180820140415/https://xcpfox.com/', label: 'archive.org' },
    logo: logoFox,
  },
  {
    name: 'XCP Key',
    description:
      'Counterwallet',
    link: { href: 'https://web.archive.org/web/20180825035959/https://xcpkey.com/', label: 'archive.org' },
    logo: logoXcp,
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-200 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-xcpBlue dark:text-zinc-200 dark:group-hover:text-zinc-100">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}

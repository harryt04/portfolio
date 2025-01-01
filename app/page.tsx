import { ThemeSwitcher } from '@/components/custom/themeSwitcher'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card } from '@/components/ui/card'
import { FileText } from 'lucide-react'

const mySkills = [
  '.net',
  'amazonaws',
  'amazons3',
  'android',
  'androidstudio',
  'angular',
  'apollographql',
  'css3',
  'docker',
  'figma',
  'firebase',
  'firebase',
  'git',
  'github',
  'graphql',
  'html5',
  'javascript',
  'jest',
  'mongodb',
  'nextdotjs',
  'nodedotjs',
  'postgresql',
  'react',
  'typescript',
  'vercel',
  'visualstudiocode',
  'xcode',
]

export default function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center py-4 text-center md:h-screen">
        <div className="flex w-10/12 flex-col items-center justify-center gap-8 md:w-full md:flex-row">
          <Card className="flex flex-col items-center justify-center gap-4 p-4 text-center">
            <ThemeSwitcher />
            <Avatar className="h-64 w-64 place-self-center">
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/22422276?v=4"
                alt="@harryt04"
              />
              <AvatarFallback>HT</AvatarFallback>
            </Avatar>
            <p className="text-2xl font-bold">Hi, I&apos;m Harry Thomas</p>
            <p className="text-m">
              I&apos;m a full stack web and mobile developer.
            </p>
            <p className="text-m">
              I have a passion for separating signal from noise.
            </p>
            <Link href="/resume.pdf">
              <Button className="w-48" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                My resume
              </Button>
            </Link>
            <Link href="https://github.com/harryt04" target="_blank">
              <Button className="w-48" variant="secondary">
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                My Github
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/harrison-thomas04/"
              target="_blank"
            >
              <Button className="w-48" variant="secondary">
                <LinkedInLogoIcon className="mr-2 h-4 w-4" />
                My LinkedIn
              </Button>
            </Link>
          </Card>
          {/* <Card className="relative flex h-full w-max max-w-[32rem] flex-col items-center justify-center rounded-lg bg-background px-20 pb-20 pt-8">
            <DotPatternOutlet>
              <p className="text-2xl">Some of my skills</p>
              <IconCloud iconSlugs={mySkills} />
            </DotPatternOutlet>
          </Card> */}
        </div>
      </div>
    </>
  )
}

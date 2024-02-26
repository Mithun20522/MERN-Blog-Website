import { Footer } from 'flowbite-react'
import React from 'react'
import {Link} from 'react-router-dom'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const FooterComp = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='mt-5'>
            <Link to='/' className='text-2xl font-bold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-800 rounded-lg text-white'>IN</span>
                Blog
            </Link>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                    <Footer.Title title='About my projects'/>
                    <Footer.LinkGroup col>
                        <Footer.Link 
                            href='https://mithunverma.netlify.com/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Portfolio
                        </Footer.Link>
                        <Footer.Link 
                            href='https://articlesummarizer.onrender.com/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Advanced Artical Summarizer
                        </Footer.Link>
                        <Footer.Link 
                            href='https://mithun20522.github.io/MV-Music/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Music Player
                        </Footer.Link>
                        <Footer.Link 
                            href='https://mithun20522.github.io/Shooting-game-using-Canvas/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                Shooter Game
                        </Footer.Link>
                        <Footer.Link 
                            href='https://mithun20522.github.io/Landing-Page/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                BestCoffee landing Page
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Connect with me'/>
                    <Footer.LinkGroup>
                        <Footer.Link 
                            href='https://github.com/Mithun20522/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                <FaGithub className='w-10 h-8' />
                        </Footer.Link>
                        <Footer.Link 
                            href='https://www.linkedin.com/in/mithun-verma-045801257/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                <FaLinkedin className='w-10 h-8'/>
                        </Footer.Link>
                        <Footer.Link 
                            href='https://www.instagram.com/mithunverma01/'
                            target='_blank'
                            rel='noopener noreferrer'>
                                <FaInstagram className='w-10 h-8'/>
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div> 
                <div>
                <Footer.Title title='Legal'/>
                    <Footer.LinkGroup col>
                        <Footer.Link 
                            href='#'>
                                Privacy Policy
                        </Footer.Link>
                        <Footer.Link 
                            href='#'>
                                Terms &amp; Conditions
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider/>
                <Footer.Copyright href='#' by='Mithun Verma' year={new Date().getFullYear()}/> 
                <Footer.Divider/>
            </div>
        </div>
    </Footer>
  )
}

export default FooterComp
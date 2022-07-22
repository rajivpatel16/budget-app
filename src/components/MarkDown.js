import React, { Children } from 'react'
import { Typography, Image, Paragraph, OrderedList, Link } from '@telus-uds/ds-allium'
import ReactMarkdown from 'react-markdown'

import styles from './style.module.css'

const CustomImage = ({ src, alt, width, height }) => {
  return (
    <Image src={src} alt={alt} width={width} height={height} />
  )
}
const CustomText = (props) => {
  return (
    <div className={styles.markdownContainer}>
    <Paragraph variant={{ size: props.size }}>
      {props.children}
    </Paragraph>
    </div>
  )
}
const ListText = (props) => {
  const childrenArray = Children.toArray(props.children)
  return (
    <OrderedList variant={{ size: 'medium' }}>
      {Children.map(childrenArray, (child, index) => {
        if (child !== '\n') {
          return (<OrderedList.Item key={index}><Typography>{child}</Typography></OrderedList.Item>)
        }
      })}
    </OrderedList >
  )
}
const identedText = (props) => {
  return (
    <div className={styles.identation}>
      <Typography>{props.children}</Typography>
    </div>
  )
}
const StrongText = (props) => {
  return (
    <Typography tokens={{ fontWeight: '700' }} dataSet={{ 'di-mask': true }}>
      {props.children}
    </Typography>
  )
}
const ParagraphText = (props) => {
  return (
    <Typography>{props.children}</Typography>
  )
}
const LinkRenderer = (props, target) => {
  return (
    <Link href={props.href} tokens={{ color: '#414547' }} target={target || '_self'}>
      {props.children}
    </Link>
  )
}
export default function Markdown ({ content, target = '' }) {
  const renderers = {
    root: 'span',
    image: CustomImage,
    text: CustomText,
    strong: ({ node, ...props }) => StrongText(props),
    paragraph: ({ node, ...props }) => ParagraphText(props),
    p: ({ node, ...props }) => CustomText(props),
    ol: ({ node, ...props }) => ListText(props),
    pre: ({ node, ...props }) => identedText(props),
    a: ({ node, ...props }) => LinkRenderer(props, target)
  }
  return (
    <ReactMarkdown components={renderers}>{content}</ReactMarkdown>
  )
}

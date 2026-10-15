"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaqAccordion } from "./faq-accordion";
import { faqs, site } from "@/lib/site";

const groups = [
  {name:"The platform", indexes:[0,7]},
  {name:"AI & applications", indexes:[1,2,6]},
  {name:"Your workflow", indexes:[3,4,5]},
];
export function HomeFaq() {
  const [active,setActive]=useState(0);
  const id=useId();
  const refs=useRef<(HTMLButtonElement|null)[]>([]);
  function navigate(event:KeyboardEvent<HTMLButtonElement>,index:number){
    let next=index;
    if(event.key==="ArrowRight")next=(index+1)%groups.length;
    else if(event.key==="ArrowLeft")next=(index+groups.length-1)%groups.length;
    else if(event.key==="Home")next=0;
    else if(event.key==="End")next=groups.length-1;
    else return;
    event.preventDefault();setActive(next);refs.current[next]?.focus();
  }
  return <div className="home-faq">
    <div className="home-faq-tabs" role="tablist" aria-label="Questions by topic">{groups.map((group,index)=><button key={group.name} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active===index} tabIndex={active===index?0:-1} ref={node=>{refs.current[index]=node;}} onClick={()=>setActive(index)} onKeyDown={event=>navigate(event,index)}>{group.name}</button>)}</div>
    {groups.map((group,index)=><div key={group.name} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active!==index} tabIndex={0}><FaqAccordion items={group.indexes.map(n=>faqs[n])} defaultFirstOpen/></div>)}
    <div className="home-faq-footer"><p>Still have something on your mind?</p><Link href="/contact-us">Talk to our team<ArrowUpRight size={16} aria-hidden="true"/></Link><Link href="/faqs">Explore all FAQs<ArrowUpRight size={16} aria-hidden="true"/></Link><a href={site.appUrl}>Open the application<ArrowUpRight size={16} aria-hidden="true"/></a></div>
  </div>;
}

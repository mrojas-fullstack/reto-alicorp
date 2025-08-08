import { Plus  } from "lucide-react"

export function ThreadButton({
  message,
}: {
  message: string
}) {
  return (
    <div id="thread-bottom-container" className="relative isolate z-10 w-full basis-auto has-data-has-thread-error:pt-2 has-data-has-thread-error:[box-shadow:var(--sharp-edge-bottom-shadow)] md:border-transparent md:pt-0 dark:border-white/20 md:dark:border-transparent content-fade single-line flex flex-col">
      <div id="thread-bottom">
        <div className="text-base mx-auto [--thread-content-margin:--spacing(4)] @[37rem]:[--thread-content-margin:--spacing(6)] @[72rem]:[--thread-content-margin:--spacing(16)] px-(--thread-content-margin)">
          <div className="[--thread-content-max-width:32rem] @[34rem]:[--thread-content-max-width:40rem] @[64rem]:[--thread-content-max-width:48rem] mx-auto max-w-(--thread-content-max-width) flex-1">
            <div className="flex justify-center empty:hidden"></div>
            <div className="max-xs:[--force-hide-label:none] relative z-1 flex h-full max-w-full flex-1 flex-col">
              <button type="button" name="context-connector-pasted-link-popover-trigger" className="invisible absolute self-center" aria-hidden="true" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r1ea»" data-state="closed"></button>
              <div className="absolute start-0 end-0 bottom-full z-20"></div>
              <form className="w-full [view-transition-name:var(--vt-composer)]" data-type="unified-composer">
                <div className="hidden">
                  <input tabIndex={-1} type="file" style={{
                    border: '0px',
                    clip: 'rect(0px, 0px, 0px, 0px)',
                    clipPath: 'inset(50%)',
                    height: '1px',
                    margin: '0px -1px -1px 0px',
                    overflow: 'hidden',
                    padding: '0px',
                    position: 'absolute',
                    width: '1px',
                    whiteSpace: 'nowrap'
                  }}/>
                </div>
                <div className="bg-token-bg-primary shadow-short flex w-full cursor-text flex-col items-center justify-center overflow-clip bg-clip-padding contain-inline-size dark:bg-[#303030] rounded-[28px]">
                  <div className="relative flex min-h-14 w-full items-end">
                    <div className="relative flex w-full flex-auto flex-col">
                      <div
                        className="relative mx-5 flex min-h-14 flex-auto bg-transparent items-start"
                        style={{
                          marginInlineEnd: 'calc(5*var(--spacing) + 110px)',
                          transform: 'translateX(32px)'
                        }}
                      >
                        <div className="_prosemirror-parent_38p30_2 text-token-text-primary max-h-[max(35svh,5rem)] flex-1 overflow-auto [scrollbar-width:thin] default-browser vertical-scroll-fade-mask">
                          <textarea className="_fallbackTextarea_38p30_2" name="prompt-textarea" placeholder="Pregunta lo que quieras" data-virtualkeyboard="true" style={{ display: 'none' }}></textarea>
                          <div translate="no" className="ProseMirror" id="prompt-textarea" data-virtualkeyboard="true">
                            <p data-placeholder="Pregunta lo que quieras" className="placeholder"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute start-2.5 bottom-2.5">
                      <span className="flex" data-state="closed">
                        <button type="button" id="radix-«R2ij4im9ikpqkl4mj5»" aria-haspopup="menu" aria-expanded="false" data-state="closed" className="composer-btn" data-testid="composer-plus-btn">
                          <Plus />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
              <input className="sr-only" aria-hidden="true" id="upload-photos" accept="image/*" type="file"/>
              <input className="sr-only" aria-hidden="true" id="upload-camera" accept="image/*" capture="environment" type="file"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

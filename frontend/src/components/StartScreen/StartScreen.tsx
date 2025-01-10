import { memo } from 'react';
import type { FC } from 'react';
import { useState, useCallback, useRef } from 'react';

import resets from '../_resets.module.css';
import { BoldNetworkITProgrammingProgra } from './BoldNetworkITProgrammingProgra/BoldNetworkITProgrammingProgra.js';
import { BoldNotesDocuments } from './BoldNotesDocuments/BoldNotesDocuments.js';
import { Button_SizeSmallColorBlueTypeF } from './Button_SizeSmallColorBlueTypeF/Button_SizeSmallColorBlueTypeF.js';
import { CloudUpload_ModeLightSize16 } from './CloudUpload_ModeLightSize16/CloudUpload_ModeLightSize16.js';
import { HeaderDesktopApplication } from './HeaderDesktopApplication/HeaderDesktopApplication.js';
import classes from './StartScreen.module.css';
import { VectorIcon2 } from './VectorIcon2.js';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
  hide?: {
    LockKeyholeMinimalisticUnlocke?: boolean;
  };
}

interface UploadResult {
  success: boolean;
  originalUrl?: string;
  processedUrl?: string;
  error?: string;
}

/* @figmaId 1:674 */
export const StartScreen: FC<Props> = memo(function StartScreen(props = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = useCallback(async () => {
    if (!selectedFile || !selectedFile.name.toLowerCase().endsWith('.heic')) {
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
      if (data.success) {
        // downloadLinksRef.current = {
        //   original: data.originalUrl,
        //   processed: data.processedUrl
        // };
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Error uploading file',
      });
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.downloadLink')) {
      return;
    }
    
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.insider}>
        <div className={classes.column}>
          <div className={classes.frame48097262}>
            <div className={classes.vector} onClick={() => window.open('https://www.cere.network/', '_blank')}>
              <VectorIcon className={classes.icon2} />
            </div>
            <div className={classes.text}>
              <div className={classes.header}>
                <div className={classes.title}>HEIC to PNG Image Converter</div>
              </div>
              <div className={classes.thisDecentralizedImageConverto}>
                <div className={classes.textBlock}>
                  This Decentralized Image Convertor converts your image files completely decentralized. The file is
                  being uploaded
                </div>
                <p className={classes.labelWrapper}>
                  <span className={classes.label}>to a bucket on </span>
                  <a
                    className={classes.label2}
                    href='https://www.developer.cere.network/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Cere&#39;s Dragon 1
                  </a>
                  <span className={classes.label3}> and then send to </span>
                  <a className={classes.label4} href='https://acurast.com/' target='_blank' rel='noreferrer'>
                    Acurast&#39;s
                  </a>
                  <span className={classes.label5}> decentralized cloud compute network for conversion to PNG.</span>
                </p>
              </div>
            </div>
            <div className={classes.dragonDrop}>
              <div 
                className={`${classes.dragonDrop2} ${
                  (selectedFile || result || isUploading) ? classes.hasContent : ''
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add(classes.dragOver);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove(classes.dragOver);
                }}
                onClick={handleContainerClick}
              >
                <input
                  type="file"
                  accept=".heic"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  id="fileInput"
                />
                {!selectedFile && !result && !isUploading && (
                  <div className={classes.frame48097261}>
                    <CloudUpload_ModeLightSize16
                      className={classes.CloudUpload}
                      swap={{
                        vector: <VectorIcon2 className={classes.icon} />,
                      }}
                    />
                    <div className={classes.dragAndDropAHEICFileHereOrClic}>
                      Drag and drop a HEIC file here, or click anywhere to select
                    </div>
                  </div>
                )}
                
                {selectedFile && !isUploading && !result && (
                  <div className={classes.uploadingStatus}>{selectedFile.name} uploaded</div>
                )}
                {isUploading && (
                  <div className={`${classes.uploadingStatus} ${classes.loading}`}>
                    Converting
                  </div>
                )}
                {result && !isUploading && (
                  <div className={classes.resultContainer}>
                    {result.success ? (
                      <div className={classes.downloadLinks}>
                        <a 
                          href={`/download/${result.id}.png`}
                          download
                          className="downloadLink"
                        >
                          Download PNG
                        </a>
                        <button 
                          onClick={() => {
                            setSelectedFile(null);
                            setResult(null);
                          }}
                        >
                          Another File
                        </button>
                      </div>
                    ) : (
                      <div className={classes.errorMessage}>{result.error}</div>
                    )}
                  </div>
                )}
              </div>
              
              {selectedFile && !isUploading && !result && (
                <Button_SizeSmallColorBlueTypeF
                  className={classes.button2}
                  hide={{
                    Check: true,
                  }}
                  text={{
                    button: <div className={classes.button} onClick={handleFileUpload}>Convert</div>,
                  }}
                />
              )}
            </div>
            <div className={classes._2Columns}>
              <div className={classes.wantToLearnMore}>
                <div className={classes.header2}>
                  <BoldNotesDocuments />
                  <div className={classes.yourBuckets}>Want to learn more?</div>
                </div>
                <div className={classes.wantToLearnMore2}>
                  <div className={classes.attentionAppDevelopersWebsiteH}>
                    <p className={classes.labelWrapper2}>
                      <span className={classes.label6}>
                        - Find out more about how Cere Network is powering fully automated data clusters needed for web3
                        and AI:{' '}
                      </span>
                      <a 
                        href="http://www.cere.network" 
                        target="_blank" 
                        rel="noreferrer"
                        className={classes.label7}
                      >
                        http://www.cere.network
                      </a>
                    </p>
                    <div className={classes.textBlock2}>
                      <p></p>
                    </div>
                    <div className={classes.textBlock4}>
                      <p className={classes.labelWrapper3}>
                        <span className={classes.label8}>
                          - Learn how Acurast offers a compute layer that is both confidential and verifiable, ensuring
                          confidential, secure and efficient compute across the globe:{' '}
                        </span>
                        <a 
                          href="http://www.acurast.com" 
                          target="_blank" 
                          rel="noreferrer"
                          className={classes.label9}
                        >
                          http://www.acurast.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.areYouADeveloper}>
                <div className={classes.header3}>
                  <BoldNetworkITProgrammingProgra />
                  <div className={classes.yourBuckets2}>Are you a developer?</div>
                </div>
                <div className={classes.areYouADeveloper2}>
                  <div className={classes.attentionAppDevelopersWebsiteH2}>
                    <p className={classes.labelWrapper4}>
                      <span className={classes.label11}>- Image Converter Github: </span>
                      <a 
                        href="https://github.com/looksg00d/cere_bounty_00" 
                        target="_blank" 
                        rel="noreferrer"
                        className={classes.label12}
                      >
                        https://github.com/looksg00d/cere_bounty_00
                      </a>
                    </p>
                    <div className={classes.textBlock5}>
                      <p className={classes.labelWrapper5}>
                        <span className={classes.label13}>- Cere's Developer Console: </span>
                        <a 
                          href="https://developer.console.cere.network/" 
                          target="_blank" 
                          rel="noreferrer"
                          className={classes.label14}
                        >
                          https://developer.console.cere.network/
                        </a>
                      </p>
                    </div>
                    <div className={classes.textBlock6}>
                      <p className={classes.labelWrapper6}>
                        <span className={classes.label15}>- Acurast Developer Console: </span>
                        <a 
                          href="https://console.acurast.com/" 
                          target="_blank" 
                          rel="noreferrer"
                          className={classes.label16}
                        >
                          https://console.acurast.com/
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={classes.attentionAppDevelopersWebsiteH3}>
                    <div className={classes.textBlock7}>Get started today! You can copy this Github repo </div>
                    <div className={classes.textBlock8}>
                      and start integrating both Cere &amp; Acurast in your own applications.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeaderDesktopApplication />
    </div>
  );
});
